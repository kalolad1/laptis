from abc import ABC, abstractmethod
from typing import Dict

import gspread

from ..models.center import Center


class DataSource(ABC):
    @abstractmethod
    def get_bed_availability(self) -> Dict[str, int]:
        pass


class GoogleDocsDataSource(DataSource):
    SPREADSHEET_NAME = "[Laptis Pilot Test] Platform Contents"

    def __init__(self) -> None:
        gc = gspread.service_account()  # type: ignore
        self.sheet = gc.open(GoogleDocsDataSource.SPREADSHEET_NAME)

    def get_bed_availability(self) -> Dict[str, int]:
        bed_availability = {}
        detox_sheet = self.sheet.worksheet("Detox")  # type: ignore
        for row in range(2, 4):
            center_name = detox_sheet.cell(row, 1).value
            center_id = str(Center.objects.get(name=center_name).id)
            availability_count = detox_sheet.cell(row, 4).value
            bed_availability[center_id] = int(availability_count)

        return bed_availability
