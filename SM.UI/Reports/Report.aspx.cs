using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using Microsoft.Reporting.WebForms;
using SM.DataAccess;
using SM.UserObjects;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using static SM.UserObjects.Enums;

namespace SM.UI.Reports
{
    public partial class Report : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ShowReport();
            }
        }

        private void ShowReport()
        {
            try
            {
                ReportDocument rd = new ReportDocument();

                //Report Name
                string strReportName = Request.QueryString["RPT"].ToString();
                string strReporFile = strReportName+".rpt";

                int RType = Convert.ToInt32(Request.QueryString["Type"].ToString());

                string strPath = "~/Reports/"+ strReporFile;

                rd.Load(Server.MapPath(strPath));

                rd.SetDataSource(ReportData(strReportName));

                //Set report Parameter  
                List<ReportVM> reportParam = new List<ReportVM>();
                reportParam = ReportDefaultPatam(strReportName);

                for (int k = 0; k < reportParam.Count; k++)
                {
                    rd.SetParameterValue(reportParam[k].ParameterName, reportParam[k].ParameterValue);
                }

                CrystalReportViewer1.ReportSource = rd;
                CrystalReportViewer1.DataBind();

                if (RType == 1)
                {
                    rd.ExportToHttpResponse(ExportFormatType.PortableDocFormat, Response, false, strReportName);
                }
                else if (RType == 2)
                {
                    rd.ExportToHttpResponse(ExportFormatType.ExcelWorkbook, Response, false, strReportName);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private DataTable ReportData(string strReport)
        {
            DataTable dt = new DataTable();
            string SubHeading="";

            if (strReport == ReportName.StudentDetailReport.ToString())
            {
                StudentReport model = (StudentReport)Session["StudentDetailReport"];
                SubHeading = model.SubHeading;
                dt = new ReportDataAccess().StudentDetailReport(model);
            }
            else if (strReport == ReportName.StudentBankReport.ToString() || strReport == ReportName.StudentBankReportDownload.ToString())
            {
                StudentBankReport model = (StudentBankReport)Session["StudentBankReport"];
                SubHeading = model.SubHeading;
                dt = new ReportDataAccess().StudentBankReport(model);
            }
            else if (strReport == ReportName.PaymentDueSponserListReport.ToString())
            {
                StudentReport model = (StudentReport)Session["StudentDetailReport"];
                SubHeading = model.SubHeading;
                dt = new ReportDataAccess().PaymentDueSponserReport(model);
            }
            else if (strReport == ReportName.StudentAnnualProgressReport.ToString())
            {
                StudentReport model = (StudentReport)Session["StudentDetailReport"];
                SubHeading = model.SubHeading;
                dt = new ReportDataAccess().StudentAnnualProgressPendingReport(model);
            }
            else if (strReport == ReportName.StudentPaymentReport.ToString())
            {
                StudentPaymentReport model = (StudentPaymentReport)Session["StudentPaymentReport"];
                SubHeading = model.SubHeading;
                dt = new ReportDataAccess().StudentPaymentReportDate(model);
            }

            System.Data.DataColumn v = new System.Data.DataColumn("VendorName", typeof(System.String));
            v.DefaultValue = UserDetail.VendorName;
            dt.Columns.Add(v);

            System.Data.DataColumn cl = new System.Data.DataColumn("SubHeading", typeof(System.String));
            cl.DefaultValue = SubHeading;
            dt.Columns.Add(cl);

            return dt;
        } 

        private List<ReportVM> ReportDefaultPatam(string strReport)
        {
            List<ReportVM> arrLstDefaultParam = new List<ReportVM>();

            if (strReport == ReportName.StudentDetailReport.ToString())
            {
                StudentReport model = (StudentReport)Session["StudentDetailReport"];
            }
            else if (strReport == ReportName.StudentBankReport.ToString() || strReport == ReportName.StudentBankReportDownload.ToString())
            {
                StudentBankReport model = (StudentBankReport)Session["StudentBankReport"];
            }
            else if (strReport == ReportName.PaymentDueSponserListReport.ToString())
            {
                StudentReport model = (StudentReport)Session["StudentDetailReport"];
            }
            else if (strReport == ReportName.StudentAnnualProgressReport.ToString())
            {
                StudentReport model = (StudentReport)Session["StudentDetailReport"];
                //arrLstDefaultParam.Add(new ReportVM { ParameterName = "SubHeading", ParameterValue = model.SubHeading });
            }
            else if (strReport == ReportName.StudentPaymentReport.ToString())
            {
                StudentPaymentReport model = (StudentPaymentReport)Session["StudentPaymentReport"];
            }
            return arrLstDefaultParam;
        }

        static string NullToString(object Value)
        {

            // Value.ToString() allows for Value being DBNull, but will also convert int, double, etc.
            return Value == null ? "" : Value.ToString();

        }

        private ReportParameter CreateReportParameter(string paramName, string pramValue)
        {
            ReportParameter aParam = new ReportParameter(paramName, pramValue);
            return aParam;
        }
    }
}