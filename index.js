import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { listContacts, getContactById, removeContact, addContact } from './db/contacts.js';

const argv = yargs(hideBin(process.argv))
  .option('action', {
    alias: 'a',
    describe: 'choose action',
    demandOption: true,
  })
  .option('id', {
    alias: 'i',
    describe: 'user id',
  })
  .option('name', {
    alias: 'n',
    describe: 'user name',
  })
  .option('email', {
    alias: 'e',
    describe: 'user email',
  })
  .option('phone', {
    alias: 'p',
    describe: 'user phone',
  })
  .argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts().then(contacts => console.log(contacts));
      break;

    case 'get':
      if (!id) {
        console.warn('\x1B[31m ID is required for "get" action!');
        break;
      }
      getContactById(id).then(contact => console.log(contact));
      break;

    case 'add':
      if (!name || !email || !phone) {
        console.warn('\x1B[31m Name, email, and phone are required for "add" action!');
        break;
      }
      addContact(name, email, phone).then(newContact => console.log(newContact));
      break;

    case 'remove':
      if (!id) {
        console.warn('\x1B[31m ID is required for "remove" action!');
        break;
      }
      removeContact(id).then(removedContact => console.log(removedContact));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);