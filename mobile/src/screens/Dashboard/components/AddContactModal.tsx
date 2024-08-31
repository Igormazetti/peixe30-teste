import React from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {AddContactProps} from '../../../@types/contacts';
import {parseDate} from '../../../utils/dateFormatter';
import {
  formatPhoneNumber,
  parsePhoneNumber,
} from '../../../utils/phoneFormatter';

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  lastName: yup.string().required('Sobrenome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  phoneNumber: yup
    .string()
    .required('Telefone é obrigatório')
    .matches(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      'Telefone deve estar no formato (xx) xxxxx-xxxx',
    ),
  birthDate: yup.string().required('Data de nascimento é obrigatória'),
  address: yup.string().required('Endereço é obrigatório'),
});

interface AddContactModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  handleAdd: (contactData: AddContactProps) => void;
}

export default function AddContactModal({
  open,
  setOpen,
  handleAdd,
}: AddContactModalProps) {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    try {
      handleAdd({
        ...data,
        birthDate: parseDate(data.birthDate),
        phoneNumber: parsePhoneNumber(data.phoneNumber),
      });
      reset();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateChange = (text: string) => {
    let formattedDate = text
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .slice(0, 10);

    setValue('birthDate', formattedDate);
  };

  const handlePhoneNumberChange = (text: string) => {
    const formattedPhoneNumber = formatPhoneNumber(text);
    setValue('phoneNumber', formattedPhoneNumber);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setOpen(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Novo Contato</Text>

            <Controller
              control={control}
              name="name"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Nome"
                />
              )}
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}

            <Controller
              control={control}
              name="lastName"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Sobrenome"
                />
              )}
            />
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName.message}</Text>
            )}

            <Controller
              control={control}
              name="email"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Email"
                  keyboardType="email-address"
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}

            <Controller
              control={control}
              name="phoneNumber"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={text => {
                    onChange(text);
                    handlePhoneNumberChange(text);
                  }}
                  value={value}
                  placeholder="Telefone"
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
            )}

            <Controller
              control={control}
              name="birthDate"
              render={({field: {value}}) => (
                <TextInput
                  style={styles.input}
                  onChangeText={handleDateChange}
                  value={value}
                  placeholder="Data de Nascimento"
                />
              )}
            />
            {errors.birthDate && (
              <Text style={styles.errorText}>{errors.birthDate.message}</Text>
            )}

            <Controller
              control={control}
              name="address"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Endereço"
                />
              )}
            />
            {errors.address && (
              <Text style={styles.errorText}>{errors.address.message}</Text>
            )}

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonSave]}
                onPress={handleSubmit(onSubmit)}>
                <Text style={styles.textStyle}>Salvar</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setOpen(false)}>
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: '48%',
  },
  buttonSave: {
    backgroundColor: '#2196F3',
  },
  buttonCancel: {
    backgroundColor: '#f44336',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
