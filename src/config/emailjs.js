// EmailJS configuration
export const emailjsConfig = {
  serviceId: "service_gqa6248", // Replace with the Service ID from your EmailJS dashboard
  templateId: "template_ls6avgd", // Replace with the Template ID from your EmailJS dashboard
  publicKey: "GI5CHwnQjMGyGrfNp" // Replace with your Public Key from Account > API Keys
};

// Form field mapping for EmailJS templates - these should match the variables used in your EmailJS template
// The keys are your form field names, and the values are the variable names in your EmailJS template
export const emailjsTemplateMapping = {
  contactSection: {
    name: "user_name",
    email: "user_email",
    company: "user_company",
    service: "service_type", 
    budget: "budget_range",
    message: "message"
  },
  contactPage: {
    name: "user_name",
    email: "user_email",
    phone: "user_phone",
    company: "user_company",
    subject: "subject",
    message: "message",
    budget: "budget_range"
  }
};