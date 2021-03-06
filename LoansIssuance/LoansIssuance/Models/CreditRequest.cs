namespace LoansIssuance.Models;

public class CreditRequest
{
    public string FullName { get; set; }
    public string PassportData { get; set; }
    public int Age { get; set; }
    public int Amount { get; set; }
    public string Target { get; set; }
    public string Employment { get; set; }
    public bool IsOtherCreditsExists { get; set; }
    public string Deposit { get; set; }
}