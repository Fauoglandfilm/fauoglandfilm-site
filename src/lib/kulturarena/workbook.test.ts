import test from 'node:test';
import assert from 'node:assert/strict';
import { kulturarenaWorkbookUrl, workbookHome } from './workbook';

test('private workbook links accept only the Google Sheets editor and normalize view parameters',()=>{
  assert.equal(kulturarenaWorkbookUrl('https://docs.google.com/spreadsheets/d/example_book/edit?gid=123&authuser=1'),'https://docs.google.com/spreadsheets/d/example_book/edit?gid=123#gid=123');
  for(const value of [undefined,'javascript:alert(1)','http://docs.google.com/spreadsheets/d/book/edit','https://docs.google.com.evil.test/spreadsheets/d/book/edit','https://user@docs.google.com/spreadsheets/d/book/edit','https://docs.google.com/document/d/book/edit','https://docs.google.com/spreadsheets/d/book/edit?gid=bad','https://docs.google.com/spreadsheets/d/book/copy']) assert.equal(kulturarenaWorkbookUrl(value),null);
});

test('workbook home opens native editor and keeps logout as a guarded POST',()=>{
  const html=workbookHome('https://docs.google.com/spreadsheets/d/example_book/edit');
  assert.match(html,/Åpne CRM i Google Drive/);
  assert.match(html,/rel="noopener noreferrer"/);
  assert.match(html,/<form method="post" action="\/kulturarena\/logout">/);
  assert.doesNotMatch(html,/<iframe|<script|api\/task/);
});
