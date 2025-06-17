export interface SenderProfile {
  id: string;
  name: string;
  subject: string;
  emailContent: string;
  resumeFileName: string;
  templateId: string;
}

export const senderProfiles: SenderProfile[] = [
  {
    id: "prabhat",
    name: "Prabhat Soni",
    subject: "Job Application - Prabhat Soni",
    emailContent: `Dear Recruiter,
    
    I hope you're doing well.
    
    My name is Prabhat Soni, and I'm currently a Senior Software Engineer at Optum Global Solutions, where I focus on building scalable, high-performance web applications using React (with TypeScript), Azure Function Apps, and cloud-native tools. With hands-on experience in full-stack development and a strong foundation in DevOps and SQL, I've delivered several impactful solutions in the healthcare domain.
    
    Some highlights from my recent work:
    - Migrated legacy apps to modern React architecture to enhance performance and maintainability.
    - Built scalable, cloud-integrated features for the OptumRx Member Portal, improving UX and analytics integration.
    - Actively contributed to cross-functional Agile teams, working closely with QA, design, and product stakeholders.
    
    Outside work, I've also developed side projects like a Google Translator Clone using Next.js 14, Azure, MongoDB, and OpenAI API, and a Zoom 2.0 Clone in React Native.
    
    I'm reaching out to express my interest in potential software engineering roles at CompanyName, where I can contribute to innovative product development and cloud-scale architecture. I'd love the opportunity to speak further if there's an open position that aligns with my experience.
    
    You'll find my resume attached. Thank you for your time and consideration!
    
    Best regards,
    Prabhat Soni
    
    📧 prabhatsn3@gmail.com
    📞 9455811106
    🌐 Portfolio: https://portfolio-psoni.vercel.app/
    🔗 LinkedIn: https://www.linkedin.com/in/prabhatsn1/ | GitHub: https://github.com/prabhatsn1
    `,
    resumeFileName: "Prabhat_Resume.pdf",
    templateId: "prabhat",
  },
  {
    id: "john",
    name: "John Doe",
    subject: "Software Developer Position - John Doe",
    emailContent: "I'm a full-stack developer with 5 years of experience...",
    resumeFileName: "John_Resume.pdf",
    templateId: "john",
  },
  {
    id: "jane",
    name: "Jane Smith",
    subject: "Senior Developer Application - Jane Smith",
    emailContent: "With 8+ years of experience in cloud architecture...",
    resumeFileName: "Jane_Resume.pdf",
    templateId: "jane",
  },
];

// Helper function to get a profile by ID or name
export function getProfileByIdentifier(
  identifier: string
): SenderProfile | undefined {
  return senderProfiles.find(
    (profile) => profile.id === identifier || profile.name === identifier
  );
}

// Get default profile
export function getDefaultProfile(): SenderProfile {
  return senderProfiles[0];
}
