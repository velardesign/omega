import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";

export default function AdicionaCategoria(){
    return (
         <Card className="flex flex-col">
                <CardHeader>Cadastrar Categoria</CardHeader>
                <CardContent className="grid gap-4 pt-4 md:grid-cols-2">
                    <Input placeholder={"Código da Categoria"}></Input>
                    <Input placeholder={"Nome da Categoria"}></Input>
                </CardContent>
                <CardFooter>
                    <Button variant={"outline"}><PlusCircle className={"text-green-700"}/>Cadastrar</Button>
                </CardFooter>
            </Card>
    )
}