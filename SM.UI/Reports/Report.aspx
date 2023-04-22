<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Report.aspx.cs" Inherits="SM.UI.Reports.Report" %>

<%@ Register Assembly="CrystalDecisions.Web, Culture=neutral, PublicKeyToken=692fbea5521e1304"
    Namespace="CrystalDecisions.Web" TagPrefix="CR" %>

<!DOCTYPE html>

<html>
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>SM Admin |</title>
    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Favicons -->
    <link rel="shortcut icon" href="~/assets/images/favicon.ico" />

    <style type="text/css">   
      html#html, body#body, form#form1, div#content
      { 
        height: 1000px;
      }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div id="content">
            <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
            <CR:CrystalReportViewer ID="CrystalReportViewer1" runat="server" AutoDataBind="true"
            Height="100%" Width="100%" />
        </div>
    </form>
</body>
</html>
