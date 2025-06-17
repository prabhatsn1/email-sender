/**
 * Collection of email templates for different sender profiles
 */

interface EmailTemplateProps {
  companyName: string;
}

export const templates = {
  // Prabhat's Template
  prabhat: ({ companyName }: EmailTemplateProps): string => `
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
            <span class="icon">🌐</span> <a href="https://portfolio-psoni.vercel.app/" target="_blank">Portfolio</a><br>
            <span class="icon">🔗</span> <a href="https://www.linkedin.com/in/prabhatsn1/" target="_blank">LinkedIn</a> | 
            <a href="https://github.com/prabhatsn1" target="_blank">GitHub</a>
          </p>
        </div>
      </div>
    </body>
    </html>
    `,

  // John's Template
  john: ({ companyName }: EmailTemplateProps): string => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Software Developer Application - John Doe</title>
      <style>
        body {
          font-family: Helvetica, sans-serif;
          line-height: 1.6;
          color: #2c3e50;
          max-width: 650px;
          margin: 0 auto;
          padding: 20px;
        }
        h3 {
          color: #3498db;
        }
        ul {
          margin: 8px 0;
          padding-left: 20px;
        }
        li {
          margin-bottom: 8px;
        }
        a {
          color: #2980b9;
          text-decoration: none;
          font-weight: bold;
        }
        .signature {
          margin-top: 20px;
          border-top: 2px solid #ecf0f1;
          padding-top: 15px;
        }
        .contact-info {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .contact-item {
          margin-right: 15px;
        }
        .tech-list {
          display: inline-block;
          background: #f8f9fa;
          padding: 3px 6px;
          border-radius: 3px;
          font-family: monospace;
          margin: 2px;
        }
      </style>
    </head>
    <body>
      <p>Hello ${companyName} Team,</p>
      
      <p>I hope this email finds you well. My name is John Doe, and I'm a Full Stack Developer with 5 years of experience building modern web applications.</p>
      
      <h3>Why I'd Love to Join ${companyName}</h3>
      <p>I've been following ${companyName}'s growth and am particularly impressed with your innovative approach to solving [specific problem in their domain]. I believe my experience with [relevant technology] would allow me to hit the ground running and contribute to your team's success.</p>
      
      <h3>Technical Skills</h3>
      <p>
        <span class="tech-list">JavaScript</span>
        <span class="tech-list">React</span>
        <span class="tech-list">Node.js</span>
        <span class="tech-list">TypeScript</span>
        <span class="tech-list">GraphQL</span>
        <span class="tech-list">MongoDB</span>
        <span class="tech-list">AWS</span>
      </p>
      
      <h3>Recent Achievements</h3>
      <ul>
        <li>Led the development of a real-time analytics dashboard that improved client decision-making by 40%</li>
        <li>Improved application performance by 60% through targeted optimizations</li>
        <li>Implemented CI/CD pipeline reducing deployment time from hours to minutes</li>
      </ul>
      
      <p>I've attached my resume for your review. I would welcome the opportunity to discuss how my skills and experience align with your team's needs.</p>
      
      <p>Thank you for your consideration.</p>
      
      <p>Best regards,<br>John Doe</p>
      
      <div class="signature">
        <div class="contact-info">
          <span class="contact-item">📧 <a href="mailto:john.doe@example.com">john.doe@example.com</a></span>
          <span class="contact-item">📱 555-123-4567</span>
          <span class="contact-item">🌐 <a href="https://johndoe-portfolio.dev" target="_blank">johndoe-portfolio.dev</a></span>
          <span class="contact-item">💼 <a href="https://linkedin.com/in/johndoe" target="_blank">LinkedIn</a></span>
          <span class="contact-item">⌨️ <a href="https://github.com/johndoe" target="_blank">GitHub</a></span>
        </div>
      </div>
    </body>
    </html>
    `,

  // Jane's Template
  jane: ({ companyName }: EmailTemplateProps): string => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Senior Developer Application - Jane Smith</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, sans-serif;
          line-height: 1.7;
          color: #333;
          max-width: 650px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fafafa;
        }
        .container {
          background-color: white;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        h2 {
          color: #6b46c1;
          border-bottom: 2px solid #e9d8fd;
          padding-bottom: 8px;
        }
        ul {
          margin: 15px 0;
        }
        li {
          margin-bottom: 8px;
        }
        a {
          color: #6b46c1;
          text-decoration: none;
        }
        .highlight {
          background-color: #f3f0ff;
          padding: 15px;
          margin: 15px 0;
          border-left: 4px solid #9f7aea;
        }
        .signature {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px dashed #cbd5e0;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p>Dear ${companyName} Hiring Manager,</p>
        
        <p>I hope this message finds you well. I am Jane Smith, a Senior Software Developer with over 8 years of experience specializing in cloud architecture and enterprise software solutions.</p>
        
        <h2>Why ${companyName}?</h2>
        <p>I've been impressed by ${companyName}'s commitment to technological innovation and scaling challenges. Your recent project on [specific company achievement] particularly caught my attention, and I believe my expertise in distributed systems and high-availability architectures would be valuable to your engineering team.</p>
        
        <div class="highlight">
          <strong>Core areas of expertise:</strong>
          <ul>
            <li>Cloud Architecture (AWS, Azure) - designed systems handling 1M+ daily users</li>
            <li>Kubernetes & Containerization - implemented microservice migrations reducing operational costs by 35%</li>
            <li>System Design & Performance Optimization - improved processing speed by 70% for critical data pipelines</li>
          </ul>
        </div>
        
        <p>Most recently at CloudScale Technologies, I led a team of 7 developers in rebuilding our core platform using a microservices architecture, which improved scalability and reduced deployment issues by 80%.</p>
        
        <p>I would welcome the opportunity to bring my technical leadership and architectural expertise to the ${companyName} team. My resume is attached for your review, and I'd be delighted to discuss specific ways I could contribute to your current projects.</p>
        
        <p>Thank you for considering my application.</p>
        
        <p>Warm regards,<br>Jane Smith</p>
        
        <div class="signature">
          <div class="contact-grid">
            <div>📧 <a href="mailto:jane.smith@example.com">jane.smith@example.com</a></div>
            <div>📱 555-987-6543</div>
            <div>🌐 <a href="https://janesmith.tech" target="_blank">janesmith.tech</a></div>
            <div>💼 <a href="https://linkedin.com/in/janesmith" target="_blank">LinkedIn Profile</a></div>
          </div>
        </div>
      </div>
    </body>
    </html>
    `,
};

// Default template ID
export const DEFAULT_TEMPLATE = "prabhat";
