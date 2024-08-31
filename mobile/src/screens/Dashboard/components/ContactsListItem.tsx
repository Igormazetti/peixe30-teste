import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Contact} from '../../../@types/contacts';

interface ContactsListItemProps {
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ContactsListItem({
  contact,
  onEdit,
  onDelete,
}: ContactsListItemProps) {
  return (
    <View style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>
          {contact.name} {contact.lastName}
        </Text>
        <Text style={styles.contactDetails}>{contact.phoneNumber}</Text>
        <Text style={styles.contactDetails}>{contact.email}</Text>
        <Text style={styles.contactDetails}>{contact.address}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.button}>
          <Text>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.button}>
          <Text>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contactItem: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactDetails: {
    fontSize: 14,
    color: '#555',
  },
  contactInfo: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: 8,
  },
});
