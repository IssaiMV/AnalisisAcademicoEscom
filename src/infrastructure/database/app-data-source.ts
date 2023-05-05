import { DataSource } from "typeorm"
import { entities } from "../../utils/entity.list"

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 33061,
    username: "issai_db",
    password: "123qwe321",
    database: "ipn",
    entities: entities,
    logging: true,
    synchronize: false
})