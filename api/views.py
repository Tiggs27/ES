from django.shortcuts import render
from django.http import HttpResponse
import boto3
import json
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
import base64
from django.views.decorators.csrf import csrf_exempt

# Auxiliary function, calls a step function and returns its output
def stepFunctionExecute(state_machine_arn,input_stepfunc):
    #sfnclient = boto3.client('stepfunctions', region_name='us-east-1', aws_access_key_id="", aws_secret_access_key="", aws_session_token="")
    sfnclient = boto3.client('stepfunctions', region_name='us-east-1')
    now = datetime.now()
    current_time = now.strftime("%H%M%S")
    response = sfnclient.start_sync_execution(
        stateMachineArn=state_machine_arn,
        name= 'myWF-userxpto-' + current_time,
        input=input_stepfunc
    )

    return response['output']

# Create your views here.

class GetUserOrders(APIView):
    @csrf_exempt
    def post(self, request, format=None):

        state_machine_arn = 'arn:aws:states:us-east-1:310984941593:stateMachine:API_GetUserOrders'

        input_stepfunc = json.dumps(request.data)

        resp = stepFunctionExecute(state_machine_arn, input_stepfunc)
        
        return Response(resp, status=status.HTTP_200_OK)

class MakeNewOrder(APIView):
    @csrf_exempt
    def post(self, request, format=None):

        state_machine_arn = 'arn:aws:states:us-east-1:310984941593:stateMachine:API_MakeNewOrder'

        input_stepfunc = json.dumps(request.data)

        resp = stepFunctionExecute(state_machine_arn, input_stepfunc)

        return Response(resp, status=status.HTTP_200_OK)

class LoginUser(APIView):
    @csrf_exempt
    def post(self, request, format=None):
        state_machine_arn = 'arn:aws:states:us-east-1:310984941593:stateMachine:API_LoginUser'

        input_stepfunc = json.dumps(request.data)

        resp = stepFunctionExecute(state_machine_arn, input_stepfunc)

        return Response(resp, status=status.HTTP_200_OK)

class RegisterUser(APIView):
    @csrf_exempt
    def post(self, request, format=None):
        state_machine_arn = 'arn:aws:states:us-east-1:310984941593:stateMachine:API_RegisterUser'

        input_stepfunc = json.dumps(request.data)

        resp = stepFunctionExecute(state_machine_arn, input_stepfunc)

        return Response(resp, status=status.HTTP_200_OK)

class ConfirmDelivery(APIView):
    @csrf_exempt
    def post(self, request, format=None):
        state_machine_arn = 'arn:aws:states:us-east-1:310984941593:stateMachine:API_SetOrderDelivery'

        input_stepfunc = json.dumps(request.data)

        resp = stepFunctionExecute(state_machine_arn, input_stepfunc)

        return Response(resp, status=status.HTTP_200_OK)

def main(request):
    return HttpResponse("<h1>Hello</h1>")
