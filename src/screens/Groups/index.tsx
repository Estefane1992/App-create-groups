import { Header } from "@components/Header";
import { Container} from "./styles";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { useState } from "react";
import { FlatList } from "react-native";
import { Button } from "@components/Button";

export default function Groups(){
    const [groups, setGroups] = useState([]);
    return(
        <Container>
            <Header />
            <Highlight 
                title="Turmas"
                subtitle="Estude com sua turma"
            />
            <FlatList 
                data={groups}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <GroupCard 
                        title={item}
                    />
                )}
                contentContainerStyle={groups.length === 0 && {flex: 1}}
                ListEmptyComponent={() => (
                    <ListEmpty 
                        message="Você ainda não possui turmas. Cadastre uma nova turma!"
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
            <Button 
                title='Criar nova turma'
            />
        </Container>
        
    )
}
