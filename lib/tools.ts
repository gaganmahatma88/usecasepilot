export interface Tool {
  key: string
  name: string
  url: string
  description: string
}

export const tools: Record<string, Tool> = {
  snyk: {
    key: 'snyk',
    name: 'Snyk',
    url: 'https://snyk.io/?via=usecasepilot',
    description: 'AI-powered vulnerability scanning for developers.',
  },
  sonarqube: {
    key: 'sonarqube',
    name: 'SonarQube',
    url: 'https://www.sonarsource.com/products/sonarqube/',
    description: 'Automated code quality and security analysis platform.',
  },
  checkmarx: {
    key: 'checkmarx',
    name: 'Checkmarx',
    url: 'https://checkmarx.com',
    description: 'Application security testing platform.',
  },
}

export function getToolForSlug(slug: string): Tool {
  if (slug.includes('security')) return tools.snyk
  if (slug.includes('code')) return tools.sonarqube
  return tools.snyk
}
