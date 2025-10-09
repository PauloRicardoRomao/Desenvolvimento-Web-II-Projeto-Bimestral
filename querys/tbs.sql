create database if not exists cultura;
use cultura;

drop database cultura;

show tables;

create table if not exists plantio(
	idPlantio int primary key auto_increment not null,
    descricaoPlantio varchar(50) not null,
    quantidadePlantio numeric(13,3) not null,
    unidadePlantio enum("m²", "ha", "Alqueire", "Acre") not null,
    dataInicioPlantio date not null,
    duracaoPlantio int,
    carimboDataHoraPlantio datetime default current_timestamp,
    situacaoPlantio boolean default true
);
insert into plantio (descricaoPlantio, quantidadePlantio, unidadePlantio,
					dataInicioPlantio, duracaoPlantio)
values
("Tomate", 100.000, "t", "2025-10-22", 120);

select * from plantio;

create table if not exists dadoPlantio(
	idDadoPlantio int primary key auto_increment not null,
    plantioDadoPlantio int not null,
    descricaoDadoPlantio varchar(50) not null,
    quantidadeDadoPlantio numeric(13,3) not null,
    unidadeDadoPlantio enum("t", "kg", "l") not null,
    carimboDataHoraDadoPlantio datetime default current_timestamp,
    foreign key (plantioDadoPlantio) references plantio(idPlantio)
);

create table if not exists colheita(
	idColheita int primary key auto_increment not null,
    plantioColheita int not null,
    dataColheita date not null,
    carimboDataHoraColheita datetime default current_timestamp,
    foreign key (plantioColheita) references plantio(idPlantio)
);

insert into colheita(plantioColheita, dataColheita)
values
(2, "2025-10-22");

select * from colheita;