/**
 * Email template with hardcoded HTML structure
 * Contains placeholders for dynamically replaced content
 */

interface EmailTemplateProps {
  companyName: string;
}

export function getEmailTemplate({ companyName }: EmailTemplateProps): string {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Application - Prabhat Soni</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333333;
        max-width: 650px;
        margin: 0 auto;
        padding: 20px;
      }
      ul {
        margin: 5px 0;
        padding-left: 20px;
      }
      li {
        margin-bottom: 5px;
      }
      a {
        color: #0366d6;
        text-decoration: none;
      }
      .signature {
        margin-top: 20px;
        border-top: 1px solid #eaeaea;
        padding-top: 15px;
      }
      .contact-info {
        margin-top: 10px;
      }
      .icon {
        margin-right: 5px;
      }
    </style>
  </head>
  <body>
    <p>Dear Recruiter,</p>
    <p>I hope you're doing well.</p>
    
    <p>My name is Prabhat Soni, and I'm currently a Senior Software Engineer at Optum Global Solutions, where I focus on building scalable, high-performance web applications using React (with TypeScript), Azure Function Apps, and cloud-native tools. With hands-on experience in full-stack development and a strong foundation in DevOps and SQL, I've delivered several impactful solutions in the healthcare domain.</p>
    
    <p>Some highlights from my recent work:</p>
    <ul>
      <li>Migrated legacy apps to modern React architecture to enhance performance and maintainability.</li>
      <li>Built scalable, cloud-integrated features for the OptumRx Member Portal, improving UX and analytics integration.</li>
      <li>Actively contributed to cross-functional Agile teams, working closely with QA, design, and product stakeholders.</li>
    </ul>
    
    <p>Outside work, I've also developed side projects like a Google Translator Clone using Next.js 14, Azure, MongoDB, and OpenAI API, and a Zoom 2.0 Clone in React Native.</p>
    
    <p>I'm reaching out to express my interest in potential software engineering roles at ${companyName}, where I can contribute to innovative product development and cloud-scale architecture. I'd love the opportunity to speak further if there's an open position that aligns with my experience.</p>
    
    <p>You'll find my resume attached. Thank you for your time and consideration!</p>
    
    <p>Best regards,<br>Prabhat Soni</p>
    
    <div class="signature">
      <div class="contact-info">
        <p>
          <span class="icon">📧</span> <a href="mailto:prabhatsn3@gmail.com">prabhatsn3@gmail.com</a><br>
          <span class="icon">📞</span> 9455811106<br>
          <span class="icon">🌐</span> <a href="https://prabhatsoni.vercel.app/" target="_blank">Portfolio</a><br>
          <span class="icon">🔗</span> <a href="https://www.linkedin.com/in/prabhat-soni/" target="_blank">LinkedIn</a> | 
          <a href="https://github.com/prabhatsoni99" target="_blank">GitHub</a>
        </p>
      </div>
    </div>
  </body>
  </html>
    `;
}
