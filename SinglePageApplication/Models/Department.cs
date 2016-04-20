﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace SinglePageApplication.Models
{
    public class Department
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set;}

        public virtual List<Employee> Employees { get; set; }
    }
}