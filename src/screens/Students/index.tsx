import { FlatList } from "react-native";
import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumberOfStudents } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { useState } from "react";


export function Students() {
    const [turma, setTurma] = useState('Turma A');
    const [students, setStudents] = useState([]);
    return(
        <Container>
            <Header showBackButton/>
            <Highlight 
                title='Nome da Turma'
                subtitle='Adicione alunos à turma para começar estudar'
            />
            <Form>
                <Input
                    placeholder='Nome do participante'
                    autoCorrect={false}
                />
                <ButtonIcon
                    icon='add'
                />
            </Form>
            <HeaderList>
                <FlatList
                data={['Turma A', 'Turma B']}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    < Filter
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
        </Container>
    )
}