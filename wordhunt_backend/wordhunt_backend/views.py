from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.views import View
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def getDictionary(request):
    print(f"Received board: {request.body}")
    return HttpResponse("Hello, Django!")
