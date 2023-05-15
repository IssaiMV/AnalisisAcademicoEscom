import { Documento } from "../entity/Documento";

export class DocumentoRepository {

    constructor() {
    }

    async crearDocumento(myDataSource: any, documento: Documento): Promise<Documento> {
        const newDocumento = await myDataSource.getRepository(Documento).create(documento);
        const result = await myDataSource.getRepository(Documento).save(newDocumento);
        return result;
    }

    async obtenerDocumentos(myDataSource: any): Promise<Documento[]> {
        const documentos = await myDataSource.getRepository(Documento).find({
            relations: ['usuario'],
        });
        return documentos;
    }

    async obtenerDocumentoPorId(myDataSource: any, id: number): Promise<Documento | undefined> {
        const result = await myDataSource.getRepository(Documento).findOneBy({ id: id });
        return result;
    }

    async modificarDocumento(myDataSource: any, id: number, documento: Documento): Promise<Documento | undefined> {
        const documentoExistente = await myDataSource.getRepository(Documento).findOneBy({ id: id });
        if (documentoExistente) {
            const documentoModificado = Object.assign(documentoExistente, documento);
            return await myDataSource.getRepository(Documento).save(documentoModificado);
        }
        return undefined;
    }

    async eliminarDocumento(myDataSource: any, id: number): Promise<boolean> {
        const result = await myDataSource.getRepository(Documento).delete(id);
        return result.affected !== 0;
    }
}
