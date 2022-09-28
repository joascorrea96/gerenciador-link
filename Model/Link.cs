using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GerenciadorLink.Model
{
    [Table("Link")]
    public class Link
    {
        [Column("Id")]
        public int Id { get; set; }

        [Column("Titulo")]
        public string Titulo { get; set; }

        [Column("Endereco")]
        public string Endereco { get; set; }

        [Column("Descricao")]
        public string Descricao { get; set; }

    }
}
