export interface Tool {
  key: string
  name: string
  url: string
  description: string
  benefits?: string[]
}

export const tools: Record<string, Tool> = {
  snyk: {
    key: 'snyk',
    name: 'Snyk',
    url: 'https://snyk.io/?via=usecasepilot',
    description: 'AI-powered vulnerability scanning for developers.',
    benefits: [
      'Detect vulnerabilities automatically',
      'Integrates with GitHub and CI/CD',
      'Free developer plan available',
    ],
  },
  sonarqube: {
    key: 'sonarqube',
    name: 'SonarQube',
    url: 'https://www.sonarsource.com/products/sonarqube/',
    description: 'Automated code quality and security analysis platform.',
    benefits: [
      'Catch bugs and code smells early',
      'Supports 30+ programming languages',
      'Free Community Edition available',
    ],
  },
  checkmarx: {
    key: 'checkmarx',
    name: 'Checkmarx',
    url: 'https://checkmarx.com',
    description: 'Application security testing platform.',
    benefits: [
      'Static and dynamic application security testing',
      'Integrates into existing CI/CD pipelines',
      'Detailed remediation guidance per finding',
    ],
  },
  veracode: {
    key: 'veracode',
    name: 'Veracode',
    url: 'https://www.veracode.com',
    description: 'Cloud-based application security testing platform.',
  },
  'owasp-zap': {
    key: 'owasp-zap',
    name: 'OWASP ZAP',
    url: 'https://www.zaproxy.org',
    description: 'Open-source web application security scanner.',
  },
}

// Name → registry key for rehype tool-link rewriting
export const TOOL_NAME_TO_KEY: Record<string, string> = {
  'Snyk': 'snyk',
  'SonarQube': 'sonarqube',
  'Checkmarx': 'checkmarx',
  'Veracode': 'veracode',
  'OWASP ZAP': 'owasp-zap',
}

export function getToolForSlug(slug: string): Tool {
  if (slug.includes('security')) return tools.snyk
  if (slug.includes('code')) return tools.sonarqube
  return tools.snyk
}
