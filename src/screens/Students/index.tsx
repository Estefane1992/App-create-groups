import { Header } from "@components/Header";
import { Container, Form } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";


export function Students() {
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
        </Container>
    )
}