from werkzeug.datastructures import Headers as createHeaders


def Headers():
    header = createHeaders()
    header.add('Access-Control-Allow-Origin', '*')
    return header
