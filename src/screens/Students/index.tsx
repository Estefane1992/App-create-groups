import { useEffect, useState, useRef } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Alert, FlatList, TextInput } from "react-native";
import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumberOfStudents } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { StydentsCard } from "@components/StudentsCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppErros";

import { studentAddByGroup } from "@storage/student/studentAddByGroups";
import { studentsGetByGroupAndTurma } from "@storage/student/studentsGetByGroupAndTurma";
import { StudentStorageDTO } from "@storage/student/StudentStoregeDTO";
import { studentRemoveByGroup } from "@storage/student/studentRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";


type RouteParams = {
    group: string;
};

export function Students() {
    const [isLoading, setIsLoading] = useState(true);
    const [newStudentName, setNewStudentName] = useState("");
    const [turma, setTurma] = useState("Turma A");
    const [students, setStudents] = useState<StudentStorageDTO[]>([]);
    const navigation = useNavigation();
    const route = useRoute();
    const { group } = route.params as RouteParams;

    const newStudentNameInputRef = useRef<TextInput>(null);

    async function handleAddStudent() { 
        if (newStudentName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar à turma.');
        }

        const newStudent = {
            name: newStudentName,
            turma,
        }

        try {
            await studentAddByGroup(newStudent, group);

            newStudentNameInputRef.current?.blur();
            setNewStudentName('');
            fetchSudentsByTurma();

        } catch (error) {
            if(error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message);
            } else {
                console.log(error);
                Alert.alert('Nova pessoa', 'Não foi possível adicionar');
            }
        }
    }

    async function fetchSudentsByTurma() {
        try {
            setIsLoading(true);

            const studentsByTurma = await studentsGetByGroupAndTurma(group, turma);

            setStudents(studentsByTurma);
           
        } catch (error) {
            console.log(error)
            Alert.alert('Alunos', 'Não foi possível carregar os alunos do time selecionado.')
        } finally {
             setIsLoading(false);
        }
    }

    async function handleStudentsRemove(studentsName: string) { 
        try {
            await studentRemoveByGroup(studentsName, group);
            fetchSudentsByTurma();
        } catch (error) {
            console.log(error);
            Alert.alert('Alunos', 'Não foi possível remover o aluno.')
            
        }
    }

    async function groupRemove() { 
       try {
           await groupRemoveByName(group);
           navigation.navigate('groups');
       } catch (error) {
           console.log(error);
            Alert.alert('Remover turma', 'Não foi possível remover a turma.')
       }
    }

    async function handleGroupRemove() {
        Alert.alert(
            'Remover',
            'Deseja remover a turma?',
            [
                { text: 'Não', style: 'cancel' },
                {text: 'Sim', onPress: () => groupRemove() }
            ]
        )
    }
    
    useEffect(() => {
        fetchSudentsByTurma();
    }, [turma]);

    return (
        <Container>
            <Header showBackButton />
            <Highlight
                title={group}
                subtitle="Adicione alunos à turma para começar estudar"
            />
            <Form>
                <Input
                    inputRef={newStudentNameInputRef}
                    onChangeText={setNewStudentName}
                    value={newStudentName}
                    placeholder="Nome do participante"
                    autoCorrect={false}
                    onSubmitEditing={handleAddStudent}
                    returnKeyType="done"
                />

                <ButtonIcon
                    icon="add"
                    onPress={handleAddStudent}
                
                />

            </Form>
            <HeaderList>
                <FlatList
                    data={["Turma A", "Turma B"]}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === turma}
                            onPress={() => setTurma(item)}
                        />
                    )}
                    horizontal
                />
                <NumberOfStudents>
                    {students.length}
                </NumberOfStudents>
            </HeaderList>

            {
                isLoading ? <Loading /> :
                <FlatList
                    data={students}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <StydentsCard
                            name={item.name}
                            onRemove={() => handleStudentsRemove(item.name)}
                        />
                    )}
                    ListEmptyComponent={() => (
                        <ListEmpty message="Não há alunos cadastrados" />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        { paddingBottom: 100 },
                        students.length === 0 && { flex: 1 },
                    ]}
                />
            }
            <Button
                title="Remover turma"
                type="SECONDARY"
                onPress={handleGroupRemove}
            />
        </Container>
    );
}
