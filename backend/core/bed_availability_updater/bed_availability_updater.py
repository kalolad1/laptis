from typing import Dict, List

from .DataSource import DataSource, GoogleDocsDataSource
from ..models.center import Center


def run() -> None:
    data_sources = create_data_sources()

    bed_availabilities = {}
    for data_source in data_sources:
        bed_availabilities.update(data_source.get_bed_availability())

    update_database(bed_availabilities)


def create_data_sources() -> List[DataSource]:
    return [GoogleDocsDataSource()]


def update_database(bed_availabilities: Dict[str, int]) -> None:
    for key, val in bed_availabilities.items():
        center = Center.objects.get(id=key)
        center.available_beds = val
        center.save()
