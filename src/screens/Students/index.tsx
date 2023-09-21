import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native";
import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumberOfStudents } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { StydentsCard } from "@components/StudentsCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

type RouteParams = {
    group: string;
};

export function Students() {
    const [turma, setTurma] = useState("Turma A");

    const [students, setStudents] = useState([]);

    const route = useRoute();
    const { group } = route.params as RouteParams;

    return (
        <Container>
            <Header showBackButton />
            <Highlight
                title={group}
                subtitle="Adicione alunos à turma para começar estudar"
            />
            <Form>
                <Input placeholder="Nome do participante" autoCorrect={false} />
                <ButtonIcon icon="add" />
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
                <NumberOfStudents>{students.length}</NumberOfStudents>
            </HeaderList>
            <FlatList
                data={students}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <StydentsCard name={item} onRemove={() => { }} />
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
            <Button title="Remover turma" type="SECONDARY" />
        </Container>
    );
}
