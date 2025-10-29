using System;

using System.Collections.Generic;

using System.ComponentModel.DataAnnotations;

namespace FinalProjectC_.Models

{

    public class Bank : AuditableEntity

    {

        public int Id { get; set; }

        public string BankName { get; set; } = string.Empty;

        public ICollection<Branch>? Branches { get; set; }

    }

}

