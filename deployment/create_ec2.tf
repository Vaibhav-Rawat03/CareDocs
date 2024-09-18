provider "aws" {
  region = "ap-south-1"
}

resource "aws_security_group" "care_docs_sg" {
  name_prefix = "care-docs-sg"
  
  ingress {
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow from any IP (adjust for security if needed)
  }

  # Ingress rule to allow SSH access on port 22
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow SSH from any IP (restrict in production)
  }

  # Egress rule to allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "CareDocs" {
  ami           = "ami-0522ab6e1ddcc7055"
  instance_type = "t2.micro"

  key_name = "Connect"

  vpc_security_group_ids = [aws_security_group.care_docs_sg.id]
}

resource "aws_eip" "care_docs_eip" {
  instance = aws_instance.CareDocs.id
  # vpc      = true  # Required for EC2-VPC
}

output "public_ip" {
  value = aws_instance.CareDocs.public_ip
}
