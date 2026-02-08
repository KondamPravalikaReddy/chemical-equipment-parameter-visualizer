from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Dataset
from .utils import analyze_csv

@api_view(['POST'])
def upload_csv(request):
    file = request.FILES['file']
    summary = analyze_csv(file)

    Dataset.objects.create(
        name=file.name,
        summary=summary
    )

    if Dataset.objects.count() > 5:
        Dataset.objects.order_by('uploaded_at').first().delete()

    return Response(summary)

@api_view(['GET'])
def history(request):
    datasets = Dataset.objects.order_by('-uploaded_at')[:5]
    return Response([
        {
            "name": d.name,
            "uploaded_at": d.uploaded_at,
            "summary": d.summary
        }
        for d in datasets
    ])
