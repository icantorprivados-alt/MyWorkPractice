-- Database: CRUDTAREA

-- DROP DATABASE IF EXISTS "CRUDTAREA";

/*CREATE DATABASE "CRUDTAREA"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

*/
--TAREA CRUD- IVETTE CANTOR 
--EJERCICIO1 Agregar un nuevo propietario

INSERT INTO owners (
    first_name, 
    last_name, 
    company_name, 
    email, 
    phone, 
    tax_id, 
    address_line1, 
    address_line2, 
    city, 
    state, 
    country, 
    postal_code
-- ) 
VALUES (
    'Ivette',                       
    'Cantor',                     
    'PatrimonioyFinanzas.com',       
    'gerente@PatrimonioyFinanzas.com',       
    '77777777',          
    '11-22222222-3',              
    'Zaragoza',            
    'CAlle principal',            
    'La Libertad ',               
    'La libertad',                       
    'El Salvador',                  
    '503'                    
);
 



--EJERCICIO2 Crear alojamiento vinculado

INSERT INTO accommodations (
    owner_id, 
    accommodation_type_id, 
    location_id, 
    name, 
    description, 
    max_guests, 
    bedroom_count, 
    bathroom_count, 
    base_price_per_night, 
    currency_code, 
    check_in_time, 
    check_out_time, 
    is_active
) 
VALUES (
    1,                                           
    4,                                         
    19,                                         
    'Hermosa casa Zaragoza',     
    'Increíble alojamiento vacacional ubicado en Zaragoza, departamento de La Libertad, El Salvador,  pocos minutos de la costa.', -- description (text)
    6,                                           
    3,                                           
    2,                                           
    120.50,                                     
    'USD',                                      
    '15:00:00',                                  
    '11:00:00',                                 
    TRUE                                         
);


--EJERCICIO3 HUESTPED Y RESERVA 

INSERT INTO booking_guests (
    booking_guest_id, 
    booking_id, 
    first_name, 
    last_name, 
    age, 
    document_number, 
    created_at
) 
VALUES (
    104,                               
    100,                               
    'Ivette',                        
    'Cantor',                          
    30,                               
    '999999999',                       
    CURRENT_TIMESTAMP                 
);



--EJERCICIO4 Insertar pago 

INSERT INTO payments (
    payment_id, 
    booking_id, 
    payment_date, 
    amount, 
    payment_method, 
    payment_status, 
    transaction_reference, 
    notes, 
    created_at
) 
VALUES (
    91,                               
    100,                               
    CURRENT_TIMESTAMP,                
    222.20,                       
    'Credit Card',                    
    'COMPLETED',                      
    'AAA-987654321',                 
    'Pago inicial de la reserva 100',  
    CURRENT_TIMESTAMP                  
);

--EJERCICIO 5 Alojamientos activos 
SELECT 
    accommodation_id AS id_alojamiento,
    name AS nombre_alojamiento,
    description AS descripcion,
    max_guests AS max_huespedes,
    bedroom_count AS habitaciones,
    bathroom_count AS banos,
    base_price_per_night AS precio_por_noche,
    currency_code AS moneda,
	is_active AS ACTIVO
FROM 
    accommodations
WHERE 
    is_active = TRUE
ORDER BY 
    name ASC;



--EJERCICIO 6 Huespedes por pais
SELECT first_name, last_name, country 
FROM   owners
Order by country asc 

--EJERCICIO7 RESERVA POR FECHAS 
SELECT 
    booking_id,
    check_in_date,
    check_out_date,
    total_amount
   FROM 
    bookings
WHERE 
    check_in_date BETWEEN '2026-01-01' AND '2026-01-31'
ORDER BY 
    check_in_date ASC;

--EJERCICIO8 ACTUALIZAR EL PRECIO 
UPDATE bookings
SET total_amount = total_amount * 1.25;



--EJERCICIO 9 ACTUALIZAR EL ESTADO DE RESERVA 
--Cambiare el estado de confirmado (2) a cancelado  (5)

UPDATE bookings
SET booking_status_id = 5
WHERE booking_status_id = 2;




--EJERCICIO 10 ELIMINAR RESEÑA 

DELETE FROM reviews
WHERE review_id = 123;


--EJERCICIO 11 


--EJERCICIO11  HUESTPED Y RESERVA 

SELECT 
  	b.booking_id AS id_reserva,
  	bg.first_name AS nombre_huesped,
   	bg.last_name AS apellido_huesped,
    b.booking_reference AS referencia,
    b.check_in_date AS fecha_ingreso,
    b.check_out_date AS fecha_salida,
    b.total_amount AS total_pagar
 FROM 
    bookings b
INNER JOIN 
    booking_guests bg ON b.booking_id = bg.booking_id;




--EJERCICIO12  Alojamiento completo 

SELECT 
    b.booking_id AS id_reserva,
	g.first_name AS nombre_cliente,
    g.last_name AS apellido_cliente,
    b.booking_reference AS referencia,
    b.check_in_date AS fecha_ingreso,
    b.check_out_date AS fecha_salida,
    b.total_amount AS monto_total,
        a.name AS nombre_acomodacion,
	r.room_name AS habitacion,
    r.floor_number AS piso,
    bs.status_name AS estado_reserva
FROM 
    bookings b
INNER JOIN guests g 
    ON b.guest_id = g.guest_id
INNER JOIN accommodations a 
    ON b.accommodation_id = a.accommodation_id
INNER JOIN rooms r 
    ON b.room_id = r.room_id
INNER JOIN booking_statuses bs 
    ON b.booking_status_id = bs.booking_status_id;


--EJERCICIO13  PAGOS + RESERVAS 
SELECT 
    b.booking_id AS id_reserva,
    b.booking_reference AS referencia,
    b.check_in_date AS fecha_ingreso,
    b.check_out_date AS fecha_salida,
    b.total_amount AS total_reserva,
    p.payment_id AS id_pago,
    p.payment_date AS fecha_pago,
    p.amount AS monto_pagado,
    p.payment_method AS metodo_pago,
    p.payment_status AS estado_pago
FROM 
    bookings b
INNER JOIN 
    payments p ON b.booking_id = p.booking_id;



--EJERCICIO14 sin reseñas

SELECT 
    a.accommodation_id AS id_alojamiento,
    a.name AS nombre_alojamiento
FROM 
    accommodations a
LEFT JOIN 
    reviews r ON a.accommodation_id = r.accommodation_id
WHERE 
    r.review_id IS NULL;





--EJERCICIO15 sin reserva 

SELECT 
    a.accommodation_id,
    a.name AS nombre_alojamiento,
    a.base_price_per_night,
    b.booking_id 
FROM 
    accommodations a
LEFT JOIN 
    bookings b ON a.accommodation_id = b.accommodation_id
WHERE 
    b.booking_id IS NULL;




--EJERCICIO16  total de ingresos 


SELECT 
    SUM(amount) AS total_ingresos
FROM 
    payments;





--EJERCICIO17  promedio raiting 


SELECT 
    AVG(rating) AS promedio
FROM 
    reviews;




--EJERCICIO18  Top alojamientos 
SELECT 
    accommodation_id AS id_alojamiento,
    COUNT(*) AS total_reservas
FROM 
    bookings
GROUP BY 
    accommodation_id
ORDER BY 
    total_reservas DESC
LIMIT 5;


--EJERCICIO19  Mas de tres reservas 

SELECT 
    g.guest_id AS id_cliente,
    g.first_name AS nombre_cliente,
    g.last_name AS apellido_cliente,
    COUNT(b.booking_id) AS total_reservas
FROM 
    guests g
INNER JOIN 
    bookings b ON g.guest_id = b.guest_id
GROUP BY 
    g.guest_id, 
    g.first_name, 
    g.last_name
HAVING 
    COUNT(b.booking_id) > 3
ORDER BY 
    total_reservas DESC;


--EJERCICIO20  Mas de tres reservas 

SELECT 
    accommodation_id AS id_alojamiento,
    name AS nombre_alojamiento,
    description AS descripcion,
    max_guests AS max_huespedes,
    base_price_per_night AS precio_por_noche,
    currency_code AS moneda
FROM 
    accommodations
WHERE 
    base_price_per_night = (
        SELECT MAX(base_price_per_night) 
        FROM accommodations
    );






 
