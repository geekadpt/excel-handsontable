<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Excel-Handsontable - 新一代云端办公</title>
    <meta name="description" content="">
    <meta name="robots" content="all,follow">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet" type="text/css"/>
    <!-- Favicon-->
    <link rel="shortcut icon" href="https://blog-vuetify.oss-cn-beijing.aliyuncs.com/app/images/app/favicon2.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/creativetimofficial/tailwind-starter-kit/compiled-tailwind.css">

</head>
<body>
<div id="app">
    <router-view></router-view>
</div>

<script type="text/javascript" src="{{ mix('js/app.js') }}"></script>
</body>
</html>

