# Utils

## SQLite 



```sql

INSERT INTO sua_tabela
(numero_os, outros_campos)
VALUES 
('OS-' || printf('%06d', last_insert_rowid()), outros_valores);

```