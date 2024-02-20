import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
      
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

    return JSON.parse(data);
}

async function getAllContacts() {
  // ...твій код. Повертає масив контактів.
    const contacts = await listContacts();

    return contacts;
}

const writeContacts = (contacts) =>
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();

    const contact = contacts.find((contact) => contact.id == contactId);
    
    return contact || null;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    //  
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }
    
    const [removedContact] = contacts.splice(index, 1);

  await writeContacts(contacts);

  return removedContact;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
    const contacts = await listContacts();

    const newContact = { id: nanoid(), name, email, phone };

    contacts.push(newContact);
    
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;

}

export default {
  listContacts,
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
};