"use client"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";

import {addCategoria} from "@/actions/categoria-action";

export default function AdicionaCategoria() {

    return (
        <Card className="flex flex-col">
            <CardHeader>Cadastrar Categoria</CardHeader>
            <form action={addCategoria} className="flex flex-col gap-4">
                <CardContent className="grid gap-4 pt-4 md:grid-cols-2">
                    <Input
                        placeholder={"Nome da Categoria"}
                        name={"nome"}
                        required={true}
                    />
                </CardContent>
                <CardFooter>
                    <Button
                        variant={"outline"}
                        type={"submit"}
                    >
                        <PlusCircle className={"text-green-700"}/>
                        Cadastrar
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}