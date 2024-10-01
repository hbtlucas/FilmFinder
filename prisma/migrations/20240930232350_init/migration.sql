-- CreateTable
CREATE TABLE "Genero" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Filmes" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "ano" TEXT NOT NULL,
    "lancamento" TEXT NOT NULL,
    "diretor" TEXT NOT NULL,
    "generoId" INTEGER NOT NULL,

    CONSTRAINT "Filmes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Filmes" ADD CONSTRAINT "Filmes_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "Genero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
