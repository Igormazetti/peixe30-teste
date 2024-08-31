import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {Contact, EditContactProps} from '../../@types/contacts';
import {useQuery} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactsListItem from './components/ContactsListItem';
import {ListEmpty} from '../../components/ListEmpty';
import DeleteContactModal from './components/DeleteContactModal';
import EditContactModal from './components/EditContactModal';

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
      const request = await axios.get('http://10.0.2.2:6060/contacts', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return request.data.contacts || [];
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteContacts = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.delete(`http://10.0.2.2:6060/contacts/delete/${idToDelete}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      refetch();
      setOpenDeleteModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditContacts = async (
    id: string,
    updateData: EditContactProps,
  ) => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      await axios.patch(
        `http://10.0.2.2:6060/contacts/update/${id}`,
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
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Contatos</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
});
