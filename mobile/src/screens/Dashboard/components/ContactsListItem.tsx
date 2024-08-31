import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Contact} from '../../../@types/contacts';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash, faPencil} from '@fortawesome/free-solid-svg-icons';
import {formatDate} from '../../../utils/dateFormatter';
import {formatPhoneNumber} from '../../../utils/phoneFormatter';

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
  console.log(contact.phoneNumber);
  return (
    <View style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>
          {contact.name} {contact.lastName}
        </Text>
        <Text style={styles.contactDetails}>
          Telefone: {formatPhoneNumber(contact.phoneNumber)}
        </Text>
        <Text style={styles.contactDetails}>
          Nascimento: {formatDate(contact.birthDate)}
        </Text>
        <Text style={styles.contactDetails}>E-mail: {contact.email}</Text>
        <Text style={styles.contactDetails}>Endereço: {contact.address}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.button}>
          <FontAwesomeIcon icon={faPencil} color="#2196F3" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.button}>
          <FontAwesomeIcon icon={faTrash} color="#f44336" />
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
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'column',
    gap: 36,
    alignItems: 'center',
  },
  button: {
    marginLeft: 8,
  },
});
