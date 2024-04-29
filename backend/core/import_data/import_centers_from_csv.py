import csv
from core.models.center import Center


def main():
    with open("backend/core/import_data/data/centers.csv", "r") as file:
        reader = csv.reader(file)
        next(reader)
        for row in reader:
            name = row[0]
            center_type = row[1]
            available_beds = int(row[2])
            phone_number = row[3]
            website = row[4]
            address = row[5]
            eligible_age_minimum = int(row[6])
            eligible_age_maximum = int(row[7])

            eligible_sexes = ["male", "female", "other"]
            if row[8] != "All":
                eligible_sexes = row[8].split(", ")

            a_p_with_c_d = row[9] == "Y"
            accepts_patients_on_methadone = row[10] == "Y"
            accepts_patients_who_are_pregnant = row[11] == "Y"
            accepts_patients_with_disabilities = row[12] == "Y"
            accepts_patients_who_are_uninsured = row[13] == "Y"
            eligible_health_insurances = row[14].split(", ")

            if Center.objects.filter(name=name).exists():
                continue

            Center.objects.create(
                name=name,
                center_type=center_type,
                available_beds=available_beds,
                phone_number=phone_number,
                website=website,
                address=address,
                eligible_age_minimum=eligible_age_minimum,
                eligible_age_maximum=eligible_age_maximum,
                eligible_sexes=eligible_sexes,
                eligible_health_insurances=eligible_health_insurances,
                accepts_patients_with_co_occuring_disorders=a_p_with_c_d,
                accepts_patients_on_methadone=accepts_patients_on_methadone,
                accepts_patients_who_are_pregnant=accepts_patients_who_are_pregnant,
                accepts_patients_with_disabilities=accepts_patients_with_disabilities,
                accepts_patients_who_are_uninsured=accepts_patients_who_are_uninsured,
            )
