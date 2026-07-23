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

// Simply re-export the modules - let TypeScript handle the compilation
const staticDataContent = `// Auto-generated file - do not edit manually
// Generated from API server data files
// This file re-exports glossary and lesson data for static builds

${glossaryContent}

${lessonsContent}

// Re-export for convenience
export const GLOSSARY_TERMS = getGlossaryList();
export const LESSONS = lessons;

export function getLessons() {
  return lessons;
}

export function getGlossary() {
  return getGlossaryList();
}

export function getLesson(id: string) {
  return lessons.find(lesson => lesson.id === id);
}
`;

writeFileSync(join(frontendPath, 'static-data.ts'), staticDataContent);

console.log('✅ Data copied successfully!');
console.log(`   - Glossary terms: ${(glossaryContent.match(/term:/g) || []).length}`);
console.log(`   - Lessons: ${(lessonsContent.match(/id:/g) || []).length}`);
