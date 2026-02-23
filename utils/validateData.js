#!/usr/bin/env node
/**
 * Veri tutarlılık kontrolü – bilgi hatası riskini azaltmak için.
 * Çalıştırma: node utils/validateData.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function readWorldPaths() {
  const filePath = path.join(ROOT, 'constants', 'worldPaths.js');
  const content = fs.readFileSync(filePath, 'utf8');
  const pathIds = [];
  const nameKeys = [];
  const arrayPart = content.substring(0, content.indexOf('export const countryNames'));
  const namesPart = content.substring(content.indexOf('export const countryNames'));
  arrayPart.replace(/"id":\s*"([A-Z]{3})"/g, (_, id) => pathIds.push(id));
  namesPart.replace(/"([A-Z]{3})":\s*"/g, (_, id) => nameKeys.push(id));
  return { pathIds, nameKeys };
}

function validateQuizOptions() {
  const filePath = path.join(ROOT, 'constants', 'worldQuizQuestions.js');
  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];
  const optionRegex = /options:\s*\[(.*?)\]/gs;
  const answerRegex = /correctAnswer:\s*"([^"]+)"/g;
  const blocks = content.split(/{ id:/).filter(Boolean);
  blocks.forEach((block, i) => {
    const optionsMatch = block.match(/options:\s*\[(.*?)\]/s);
    const answerMatch = block.match(/correctAnswer:\s*"([^"]+)"/);
    if (!optionsMatch || !answerMatch) return;
    const optionsStr = optionsMatch[1];
    const correct = answerMatch[1];
    const options = optionsStr.match(/"([^"]+)"/g)?.map(s => s.slice(1, -1)) || [];
    if (!options.includes(correct)) {
      errors.push({ questionIndex: i + 1, correctAnswer: correct, options });
    }
  });
  return errors;
}

function main() {
  console.log('--- Veri doğrulama (bilgi hatası kontrolü) ---\n');

  const { pathIds, nameKeys } = readWorldPaths();
  const nameSet = new Set(nameKeys);
  const missing = pathIds.filter((id) => !nameSet.has(id));
  const extra = nameKeys.filter((id) => !pathIds.includes(id));

  if (missing.length) {
    console.log('❌ Eksik ülke isimleri (haritada kod görünür):', missing.join(', '));
  } else {
    console.log('✅ Tüm harita ülke id\'leri için countryNames tanımlı.');
  }

  if (extra.length) {
    console.log('ℹ️  countryNames\'te olup haritada path yok:', extra.length, 'adet (quiz/bayrak için kullanılıyor olabilir).');
  }

  const quizErrors = validateQuizOptions();
  if (quizErrors.length) {
    console.log('\n❌ Quiz soru hatası (correctAnswer options içinde değil):', quizErrors.length);
    quizErrors.forEach((e) => console.log('   Soru', e.questionIndex, '- Cevap:', e.correctAnswer));
  } else {
    console.log('\n✅ worldQuizQuestions: Tüm doğru cevaplar şıkların içinde.');
  }

  console.log('\n--- Bitti ---');
  process.exit(missing.length || quizErrors.length ? 1 : 0);
}

main();
