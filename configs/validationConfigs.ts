// Validation config for portfolio fields
// Each field can have: required, minlength, maxlength, pattern, callbackCheck

const portfolioValidationConfig: any = {
  portfolioUrl: [
    { required: { message: "Portfolio URL is required." } }
  ],
  portfolioTitleAndDescription: {
    title: [
      { required: { message: "Title is required." } },
      { minlength: { test: 3, message: "Title must be at least 3 characters." } }
    ],
    description: [
      { required: { message: "Description is required." } }
    ]
  },
  personalDetails: {
    name: [
      { required: { message: "Name is required." } },
      { minlength: { test: 2, message: "Name must be at least 2 characters." } }
    ],
    about: [
      { required: { message: "About section is required." } },
      { minlength: { test: 10, message: "About must be at least 10 characters." } }
    ],
    location: [
      { required: { message: "Location is required." } }
    ]
  },
  experience: {
    jobTitle: [
      { required: { message: "Job title required." } }
    ],
    company: [
      { required: { message: "Company required." } }
    ],
    from: [
      { required: { message: "From date required." } }
    ],
    to: [
      { required: { message: "To date required." } }
    ],
    description: [
      { required: { message: "Description required." } }
    ]
  },
  skills: [
    { required: { message: "Skill cannot be empty." } }
  ],
  projects: {
    name: [
      { required: { message: "Project name required." } }
    ],
    link: [
      { required: { message: "Project link required." } }
    ],
    description: [
      { required: { message: "Project description required." } }
    ]
  },
  education: {
    degree: [
      { required: { message: "Degree required." } }
    ],
    institution: [
      { required: { message: "Institution required." } }
    ],
    achievements: [
      { required: { message: "Achievements required." } }
    ],
    from: [
      { required: { message: "From date required." } }
    ],
    to: [
      { required: { message: "To date required." } }
    ]
  },
  achievements: {
    title: [
      { required: { message: "Achievement title required." } }
    ],
    description: [
      { required: { message: "Achievement description required." } }
    ],
    date: [
      { required: { message: "Achievement date required." } }
    ]
  },
  hobbies: [
    { required: { message: "Hobby cannot be empty." } }
  ],
  contact: [
    { required: { message: "Contact field cannot be empty." } }
  ]
};

const blogValidationConfig: any = {
  title: [
    { required: { message: "Title is required." } },
    { minlength: { test: 3, message: "Title must be at least 3 characters." } }
  ],
  content: [
    { required: { message: "Content is required." } },
    { minlength: { test: 10, message: "Content must be at least 10 characters." } }
  ]
}
const validations = {
  portfolio: portfolioValidationConfig,
  blogs: blogValidationConfig
};
export const validationConstants = {
  PORTFOLIO: "portfolio",
  BLOGS: "blogs",
}
export default validations;