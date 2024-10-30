from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.views import View

def getDictionary(request):
    print(request)
    return HttpResponse("Hello, Django!")
