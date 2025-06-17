/**
 * Email template selector that dynamically loads templates based on profile
 */

import { DEFAULT_TEMPLATE, templates } from "./emailTemplates";

interface EmailTemplateProps {
  companyName: string;
  templateId?: string;
}

export function getEmailTemplate({
  companyName,
  templateId = DEFAULT_TEMPLATE,
}: EmailTemplateProps): string {
  // Check if the requested template exists, otherwise use default
  const templateFunction =
    templates[templateId as keyof typeof templates] ||
    templates[DEFAULT_TEMPLATE];

  // Return the generated HTML with the company name inserted
  return templateFunction({ companyName });
}
