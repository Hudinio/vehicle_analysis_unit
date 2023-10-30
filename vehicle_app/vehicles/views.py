from django.http import JsonResponse
from .utils import read_csv_data

def get_vehicles(request):
    data = read_csv_data("U:\Vehicle Project\VITF - Web Portal\Vehicles.csv")
    return JsonResponse(data, safe=False)

def get_unique_values(request):
    data = read_csv_data("U:\Vehicle Project\VITF - Web Portal\Vehicles.csv")
    
    makes = list(set([vehicle["Make"] for vehicle in data]))
    models = list(set([vehicle["Model"] for vehicle in data]))
    years = list(set([vehicle["Year"] for vehicle in data]))
    
    return JsonResponse({
        "makes": makes,
        "models": models,
        "years": years
    })
