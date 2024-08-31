import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {
  AddContactProps,
  Contact,
  EditContactProps,
} from '../../@types/contacts';
import {useQuery} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactsListItem from './components/ContactsListItem';
import {ListEmpty} from '../../components/ListEmpty';
import DeleteContactModal from './components/DeleteContactModal';
import EditContactModal from './components/EditContactModal';
import AddContactModal from './components/AddContactModal';
import Toast from 'react-native-toast-message';

export function Dashboard() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState<Contact>({
    name: '',
    phoneNumber: '',
    address: '',
    birthDate: new Date(),
    createdAt: new Date(),
    email: '',
    lastName: '',
    id: '',
    updatedAt: new Date(),
    userId: '',
  });

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>();

  const [openAddModal, setOpenAddModal] = useState(false);

  const {data, refetch} = useQuery<Contact[]>(
    ['contacts'],
    () => fetchContacts(),
    {
      staleTime: 1000 * 60 * 3,
      refetchInterval: 1000 * 60 * 3,
    },
  );

  const fetchContacts = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const request = await axios.get(`${process.env.API_URL}/contacts`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const contacts = request.data.contacts || [];
      contacts.sort((a: Contact, b: Contact) => a.name.localeCompare(b.name));

      if (contacts.length) {
        return contacts;
      }
      return [];
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Falha ao buscar contatos',
      });
    }
  };

  const handleDeleteContacts = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.delete(
        `${process.env.API_URL}/contacts/delete/${idToDelete}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      refetch();
      setOpenDeleteModal(false);
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Falha ao deletar contato',
      });
    }
  };

  const handleEditContacts = async (
    id: string,
    updateData: EditContactProps,
  ) => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      await axios.patch(
        `${process.env.API_URL}/contacts/update/${id}`,
        updateData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      refetch();
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Falha ao editar contato',
      });
    }
  };

  const handleAddContact = async (contactData: AddContactProps) => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      await axios.post('http://10.0.2.2:6060/contacts/create', contactData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      refetch();
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Falha ao criar contato',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Contatos</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setOpenAddModal(true)}>
          <Text style={styles.addButtonText}>Adicionar Contato</Text>
        </TouchableOpacity>
      </View>

      {data ? (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ContactsListItem
              onDelete={() => {
                setIdToDelete(item.id);
                setOpenDeleteModal(true);
              }}
              onEdit={() => {
                setEditData(item);
                setOpenEditModal(true);
              }}
              contact={item}
            />
          )}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<ListEmpty message="Nenhum contato na lista" />}
        />
      ) : (
        <Text style={styles.title}>Loading...</Text>
      )}
      <EditContactModal
        editData={editData}
        handleEdit={handleEditContacts}
        open={openEditModal}
        setOpen={setOpenEditModal}
      />

      <DeleteContactModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleDelete={handleDeleteContacts}
      />

      <AddContactModal
        open={openAddModal}
        setOpen={setOpenAddModal}
        handleAdd={handleAddContact}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 16,
  },
});
