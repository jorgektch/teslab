nombre = input("Nombre del trabajador: ")
apellido = input("Apellido del trabajador: ")
horas = int(input("Cantidad de horas trabajadas al mes: "))
pago = float(input("Pago por hora: "))

remuneracion = horas * pago
bono = remuneracion*.1
total = remuneracion + bono

print("Trabajador: " + nombre + " " + apellido)
print("Horas tabajadas: " + str(horas))
print("Pago por horas tabajadas: " + str(horas))

print("Remuneración mensual (horas trabajadas * pago por hora): " + str(remuneracion))
print("Bono de productividad (10%): " + str(bono))
print("Pago total (remuneración mensual + Bono): " + str(total))