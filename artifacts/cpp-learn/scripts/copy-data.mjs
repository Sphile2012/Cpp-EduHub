// Script to copy data from API server to frontend for static builds
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const apiServerPath = join(__dirname, '../../api-server/src/data');
const frontendPath = join(__dirname, '../src/lib');

console.log('📦 Copying data from API server to frontend...');

// Read the glossary file
const glossaryContent = readFileSync(join(apiServerPath, 'glossary.ts'), 'utf-8');
const lessonsContent = readFileSync(join(apiServerPath, 'lessons.ts'), 'utf-8');

// Create the static data file
const staticDataContent = `// Auto-generated file - do not edit manually
// Generated from API server data files

${glossaryContent}

${lessonsContent}

// Re-export for convenience
export { glossaryTerms as GLOSSARY_TERMS_DETAIL, getGlossaryList, getGlossaryTerm };
export { lessons as LESSONS };

export const GLOSSARY_TERMS = getGlossaryList();

export function getLessons() {
  return LESSONS;
}

export function getGlossary() {
  return GLOSSARY_TERMS;
}

export function getLesson(id: string) {
  return LESSONS.find(lesson => lesson.id === id);
}
`;

writeFileSync(join(frontendPath, 'static-data.ts'), staticDataContent);

console.log('✅ Data copied successfully!');
console.log(`   - Glossary terms: ${glossaryContent.match(/term:/g)?.length || 0}`);
console.log(`   - Lessons: ${lessonsContent.match(/id:/g)?.length || 0}`);
