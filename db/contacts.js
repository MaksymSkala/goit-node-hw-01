import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = join(__dirname, '../db', 'contacts.json');

export function listContacts() {
  return readFile(contactsPath, 'utf-8').then(data => JSON.parse(data));
}

export function getContactById(contactId) {
  return listContacts().then(contacts => contacts.find(contact => contact.id === contactId) || null);
}

export function removeContact(contactId) {
  return listContacts()
    .then(contacts => {
      const index = contacts.findIndex(contact => contact.id === contactId);
      if (index === -1) {
        return null;
      }

      const removedContact = contacts.splice(index, 1)[0];
      return writeFile(contactsPath, JSON.stringify(contacts, null, 2)).then(() => removedContact);
    });
}

export function addContact(name, email, phone) {
  return listContacts()
    .then(contacts => {
      const newContact = { id: Date.now(), name, email, phone };
      contacts.push(newContact);
      return writeFile(contactsPath, JSON.stringify(contacts, null, 2)).then(() => newContact);
    });
}