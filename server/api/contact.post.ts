import { defineEventHandler, readBody, createError } from 'h3'
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validation basique
  if (!body || !body.name || !body.email || !body.subject || !body.message) {
    throw createError({ statusCode: 400, statusMessage: 'Champs requis manquants' })
  }

  // Récupérer config SMTP depuis runtime config (nuxt.config.ts)
  const config = useRuntimeConfig()
  const smtpHost = config.smtpHost
  const smtpPort = Number(config.smtpPort || 587)
  const smtpUser = config.smtpUser
  const smtpPass = config.smtpPass
  const contactRecipient = config.contactRecipient || 'bizconnectnfc@gmail.com'

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error('SMTP non configuré correctement')
    throw createError({ statusCode: 500, statusMessage: 'SMTP non configuré' })
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  })

  // Construire le HTML du mail
  const mailHtml = `
    <h2>Nouveau message depuis le formulaire de contact</h2>
    <p><strong>Nom :</strong> ${escapeHtml(body.name)}</p>
    <p><strong>Entreprise :</strong> ${escapeHtml(body.company || '')}</p>
    <p><strong>Email :</strong> ${escapeHtml(body.email)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(body.phone || '')}</p>
    <p><strong>Sujet :</strong> ${escapeHtml(body.subject)}</p>
    <h3>Message :</h3>
    <p>${escapeHtml(body.message).replace(/\n/g, '<br/>')}</p>
  `

  try {
    await transporter.sendMail({
      from: `"Site Contact" <${smtpUser}>`, // adresse d'envoi
      to: contactRecipient,                // votre boite
      replyTo: body.email,                 // reply-to vers l'utilisateur
      subject: `[Contact] ${body.subject} — ${body.name}`,
      text: `
Nom: ${body.name}
Entreprise: ${body.company || ''}
Email: ${body.email}
Téléphone: ${body.phone || ''}
Sujet: ${body.subject}

Message:
${body.message}
      `,
      html: mailHtml
    })

    return { success: true, message: 'Message envoyé' }
  } catch (err) {
    console.error('Erreur envoi mail:', err)
    throw createError({ statusCode: 500, statusMessage: 'Impossible d\'envoyer le message pour le moment' })
  }
})

/**
 * Petit utilitaire pour échapper du HTML (prévenir injection dans le mail HTML)
 */
function escapeHtml(unsafe: string) {
  if (!unsafe) return ''
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}