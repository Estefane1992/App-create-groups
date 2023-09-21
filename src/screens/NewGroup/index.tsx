import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { groupCreate } from '@storage/group/groupCreate';



export function NewGroup() {
    const [group, setGroup] = useState('');

    const navigation = useNavigation();

    async function handleNew() {
        try {
            await groupCreate(group)
            navigation.navigate('students', { group })
        } catch (error) {
            console.log(error);
        }
        
     }

    return(
        <Container>
            <Header showBackButton/>
            <Content>
                <Icon />
                <Highlight 
                    title='Nova turma' 
                    subtitle='Crie uma nova turma para começar a organizar suas aulas.' 
                />
                <Input 
                    placeholder='Nome da turma'
                    onChangeText={setGroup}
                />
                <Button 
                    title='Criar'
                    style={{ marginTop: 20 }}
                    onPress={handleNew}
                />
            </Content>
        </Container>
    )
}